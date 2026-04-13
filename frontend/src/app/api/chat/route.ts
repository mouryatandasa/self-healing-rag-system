// Edge runtime removed to allow reliable localhost requests in dev

export async function POST(req: Request) {
  // Call the FastAPI backend
  const backendUrl = "http://localhost:8000/api/chat";
  
  try {
    const contentType = req.headers.get("content-type");
    let body: any;
    if (contentType?.includes("multipart/form-data")) {
      const incomingData = await req.formData();
      const outgoingData = new FormData();
      
      // Transfer all fields and files
      for (const [key, value] of incomingData.entries()) {
        outgoingData.append(key, value);
      }
      body = outgoingData;
    } else {
      body = JSON.stringify(await req.json());
    }

    const backendRes = await fetch(backendUrl, {
      method: "POST",
      body,
    });

    if (!backendRes.ok) {
      const errorText = await backendRes.text();
      console.error(`BACKEND ERROR (${backendRes.status}):`, errorText);
      throw new Error(`Backend responded with status: ${backendRes.status}. Details: ${errorText}`);
    }

    // Keep the streaming response flowing directly from the backend to the frontend
    return new Response(backendRes.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("FULL CONNECTION ERROR DETAILS:", {
      message: error.message,
      stack: error.stack,
      cause: error.cause
    });
    
    // Fallback response with the same EventStream format
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ text: `Error: Could not connect to Python backend! ${error.message}` })}\n\n`)
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/event-stream" },
    });
  }
}
