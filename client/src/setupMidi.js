export const setupMidi = (onNoteReceived) => {
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(
      (access) => {
        console.log('MIDI access granted');
        const inputs = access.inputs.values();
        let inputCount = 0;
        for (let input of inputs) {
          inputCount++;
          console.log(`MIDI Input Detected: ${input.name} (ID: ${input.id})`);
          input.onmidimessage = (message) => {
            const [command, note, velocity] = message.data;
            console.log(`Raw MIDI Message: Command=${command}, Note=${note}, Velocity=${velocity}`);
            if ((command & 0xF0) === 0x90 && velocity > 0) {
              console.log(`Valid Note On detected: Note=${note}`);
              onNoteReceived(note);
            }
          };
        }
        if (inputCount === 0) {
          console.log('No MIDI inputs detected');
        }
      },
      () => {
        console.error('MIDI access denied. Please enable it in your browser.');
        alert('MIDI access denied. Please enable it in your browser.');
      }
    );
  } else {
    console.error('Web MIDI API not supported in this browser.');
    alert('Web MIDI API not supported in this browser.');
  }
};