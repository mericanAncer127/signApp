import React from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Viewer } from "@react-pdf-viewer/core";

// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Create new plugin instance
// const defaultLayoutPluginInstance = defaultLayoutPlugin();

const MyPDFViewr: React.FC = () => {
  return (
    <div>
      <div style={{ height: "500px" }}>
        <Viewer fileUrl="./assets/pdfs/Michael Yamamoto.pdf" />
      </div>
    </div>
  );
};

export default MyPDFViewr;
