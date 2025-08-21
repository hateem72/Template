export const verifySoundPaths = async (sounds) => {
    console.log('Verifying sound paths...');
    for (const [name, path] of Object.entries(sounds)) {
      try {
        const response = await fetch(path);
        if (!response.ok) {
          console.error(`Failed to load sound: ${name} from path: ${path}`);
        } else {
          console.log(`✓ Successfully verified: ${name}`);
        }
      } catch (error) {
        console.error(`Error loading sound: ${name}`, error);
      }
    }
  };