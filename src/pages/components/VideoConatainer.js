import React from "react";

function VideoContainer() {
  return (
    <div className="container text--center margin-bottom--xl margin-top--lg">
      <div className="row">
        <div className="col">
          <h2>What is Jitsi?</h2>
          <iframe
            src="https://www.youtube.com/embed/TB7LlM4erx8"
            title="What is Jitsi?"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default VideoContainer;
