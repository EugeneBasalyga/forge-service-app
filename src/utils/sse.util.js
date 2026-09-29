// Server-Sent Events on top of a regular response. Headers go out with the first event, so
// anything that fails before it can still be answered with a regular JSON error
const createSseStream = (res) => {
  let closed = false;

  res.on('close', () => {
    closed = true;
  });

  const send = (event, data) => {
    // The client has gone away: drop the event instead of writing to a closed socket
    if (closed) {
      return;
    }

    if (!res.headersSent) {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        // Stops nginx-like proxies from buffering the stream
        'X-Accel-Buffering': 'no',
      });
    }

    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  const end = () => {
    if (!closed) {
      res.end();
    }
  };

  return {
    send,
    end,
  };
};

module.exports = {
  createSseStream,
};
