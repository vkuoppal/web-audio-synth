import parseMidi from "parse-midi";
import { playNote, muteNote } from "../audio/midi-interface";

export function connectExternalMidiDevice() {
  let webmidi: any;

  function playPossibleNote(event: any) {
    const parsedMidi = parseMidi(event.data);
    // @ts-ignore
    const { messageType, key, velocity } = parsedMidi;
    if (messageType === "noteon") {
      playNote({ note: key, velocity });
    } else if (messageType === "noteoff") {
      muteNote({ note: key });
    }
  }

  function refresh() {
    if (webmidi.inputs.size) {
      webmidi.inputs.forEach(function (event: any) {
        event.onmidimessage = playPossibleNote;
      });
    }
  }

  function fail(err: any) {
    console.log(`Midi connection failed: ${err}`);
  }

  function success(midiaccess: any) {
    webmidi = midiaccess;
    webmidi.onstatechange = refresh;
    refresh();
  }

  try {
    (navigator as any).requestMIDIAccess().then(success, fail);
  } catch (err) {
    console.log(`Midi access is not allowed: ${err}`);
  }
}
