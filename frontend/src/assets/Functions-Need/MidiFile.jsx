
import Embed from "flat-embed";

function MidiDownload(target) {
            var svgElement = target.current.childNodes[0];
            const svgXml = new XMLSerializer().serializeToString(svgElement);
            const blob = new Blob([svgXml], { type: "audio/midi" });
            const buffer = new ArrayBuffer(blob.size);
            const view = new Uint8Array(buffer);
            for (let i = 0; i < blob.size; i++) {
            view[i] = blob.arrayBuffer[i];
            }
            const file = new File([buffer], "file.mid", { type: "audio/midi" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(file);
            a.download = file.name;
            a.click();
}

function PngDownload (appId,score,sharingKey) {
    var embed = new Embed(target.current, {
        embedParams: {
          appId:   appId,
          score: score,
          sharingKey:sharingKey,
        },
      });
      embed.getPNG().then(function (buffer) {
        const blob = new Blob([buffer], { type: "image/png" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "scorePng";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
}
export {MidiDownload,PngDownload};