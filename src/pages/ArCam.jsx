import { useEffect, useMemo, useState } from "react";

export default function ArCam() {
  const [ready, setReady] = useState(false);
  const [cameraDeviceId, setCameraDeviceId] = useState("");

  useEffect(() => {
    let mounted = true;

    const pickBestRearCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter((d) => d.kind === "videoinput");
        console.log("[AR] videoinput devices:", videoInputs);

        // Heurística: prioriza cámaras traseras / gran angular
        const ranked = [...videoInputs].sort((a, b) => {
          const score = (label = "") => {
            const l = label.toLowerCase();
            let s = 0;
            if (
              l.includes("back") ||
              l.includes("rear") ||
              l.includes("trasera")
            )
              s += 5;
            if (l.includes("wide") || l.includes("ultra") || l.includes("main"))
              s += 3;
            if (l.includes("tele")) s -= 3;
            return s;
          };
          return score(b.label) - score(a.label);
        });

        return ranked[0]?.deviceId || "";
      } catch (e) {
        console.warn("[AR] enumerateDevices failed:", e);
        return "";
      }
    };

    const init = async () => {
      try {
        const preferredDeviceId = await pickBestRearCamera();
        if (!mounted) return;

        if (preferredDeviceId) setCameraDeviceId(preferredDeviceId);

        const primaryConstraints = preferredDeviceId
          ? {
              video: {
                deviceId: { exact: preferredDeviceId },
                width: { ideal: 1280 },
                height: { ideal: 720 },
              },
            }
          : {
              video: {
                facingMode: { ideal: "environment" },
                width: { ideal: 1280 },
                height: { ideal: 720 },
              },
            };

        const stream =
          await navigator.mediaDevices.getUserMedia(primaryConstraints);
        stream.getTracks().forEach((track) => track.stop());

        if (mounted) setReady(true);
      } catch (err) {
        console.warn("[AR] Camera constraint failed, trying fallback...", err);
        try {
          const fallback = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          fallback.getTracks().forEach((track) => track.stop());
        } catch (fallbackErr) {
          console.warn("[AR] Fallback camera access failed:", fallbackErr);
        } finally {
          if (mounted) setReady(true);
        }
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  const arjsConfig = useMemo(() => {
    const base = "sourceType: webcam; debugUIEnabled: false;";
    return cameraDeviceId ? `${base} deviceId: ${cameraDeviceId};` : base;
  }, [cameraDeviceId]);

  if (!ready) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <style>
        {`
          canvas {
            width: 100vw !important;
            height: 100vh !important;
          }

          video {
            object-fit: contain !important;
            width: 100vw !important;
            height: 100vh !important;
            right: 0 !important;
            left: unset !important;
            background: black !important;
          }
        `}
      </style>

      <a-scene
        embedded
        renderer="logarithmicDepthBuffer: true; precision: medium;"
        arjs="sourceType: webcam; debugUIEnabled: false;"
        light="defaultLightsEnabled: false"
      >
        <a-light type="ambient" intensity="4"></a-light>
        <a-light type="directional" position="0 2 2" intensity="4"></a-light>

        <a-marker type="pattern" url="/markers/pattern-marker-a.patt">
          <a-entity
            gltf-model="/models/scratch-a.glb"
            scale="2 0.3 2"
          ></a-entity>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-b.patt">
          <a-entity
            gltf-model="/models/scratch-b.glb"
            scale="2 0.3 2"
          ></a-entity>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-c.patt">
          <a-entity
            gltf-model="/models/scratch-c.glb"
            scale="2 0.3 2"
          ></a-entity>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-d.patt">
          <a-entity
            gltf-model="/models/scratch-d.glb"
            scale="2 0.3 2"
          ></a-entity>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-e.patt">
          <a-entity
            gltf-model="/models/scratch-e.glb"
            scale="2 0.3 2"
          ></a-entity>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-f.patt">
          <a-entity
            gltf-model="/models/scratch-f.glb"
            scale="2 0.3 2"
          ></a-entity>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-g.patt">
          <a-entity
            gltf-model="/models/scratch-g.glb"
            scale="2 0.3 2"
          ></a-entity>
        </a-marker>

        {/* Imagenes */}
        <a-marker type="pattern" url="/markers/pattern-marker-1.patt">
          <a-image
            src="/multimedia/marker-1.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>

        <a-marker type="pattern" url="/markers/pattern-marker-2.patt">
          <a-image
            src="/multimedia/marker-2.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>

        {/* markers 3 through 27 */}
        <a-marker type="pattern" url="/markers/pattern-marker-3.patt">
          <a-image
            src="/multimedia/marker-3.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-4.patt">
          <a-image
            src="/multimedia/marker-4.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-5.patt">
          <a-image
            src="/multimedia/marker-5.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-6.patt">
          <a-image
            src="/multimedia/marker-6.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-7.patt">
          <a-image
            src="/multimedia/marker-7.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-8.patt">
          <a-image
            src="/multimedia/marker-8.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-9.patt">
          <a-image
            src="/multimedia/marker-9.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-10.patt">
          <a-image
            src="/multimedia/marker-10.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-11.patt">
          <a-image
            src="/multimedia/marker-11.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-12.patt">
          <a-image
            src="/multimedia/marker-12.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-13.patt">
          <a-image
            src="/multimedia/marker-13.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-14.patt">
          <a-image
            src="/multimedia/marker-14.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-15.patt">
          <a-image
            src="/multimedia/marker-15.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-16.patt">
          <a-image
            src="/multimedia/marker-16.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-17.patt">
          <a-image
            src="/multimedia/marker-17.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-18.patt">
          <a-image
            src="/multimedia/marker-18.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-19.patt">
          <a-image
            src="/multimedia/marker-19.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-20.patt">
          <a-image
            src="/multimedia/marker-20.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-21.patt">
          <a-image
            src="/multimedia/marker-21.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-22.patt">
          <a-image
            src="/multimedia/marker-22.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-23.patt">
          <a-image
            src="/multimedia/marker-23.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-24.patt">
          <a-image
            src="/multimedia/marker-24.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-25.patt">
          <a-image
            src="/multimedia/marker-25.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-26.patt">
          <a-image
            src="/multimedia/marker-26.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>
        <a-marker type="pattern" url="/markers/pattern-marker-27.patt">
          <a-image
            src="/multimedia/marker-27.jpg"
            width="2"
            height="1"
            rotation="-90 0 0"
            position="0 0.01 0"
          ></a-image>
        </a-marker>

        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
}
