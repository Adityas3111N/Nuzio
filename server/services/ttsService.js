import * as googleTTS from 'google-tts-api';

const VOICE_LANG_MAP = {
  aria: 'en-GB', // British English
  kai: 'en-US',  // American English
  meera: 'en-IN', // Indian English
  hindi: 'hi-IN', // Hindi
};

const SAMPLE_TEXTS = {
  aria: 'Hello Aarav. Here is your morning briefing on AI and market movements.',
  kai: 'Good morning. Starting with Anthropic’s Claude 4.5 release notes.',
  meera: 'Namaste Aarav! Let us dive into today’s top business headlines from Mumbai.',
};

/**
 * Generate audio URL for a voice sample
 */
export function getVoiceSampleUrl(voiceId = 'aria') {
  const lang = VOICE_LANG_MAP[voiceId.toLowerCase()] || 'en-GB';
  const text = SAMPLE_TEXTS[voiceId.toLowerCase()] || SAMPLE_TEXTS.aria;
  try {
    return googleTTS.getAudioUrl(text, {
      lang,
      slow: false,
      host: 'https://translate.google.com',
      timeout: 10000,
    });
  } catch (err) {
    console.error('Error generating voice sample URL:', err.message);
    return null;
  }
}

/**
 * Generate audio URLs for a story script
 */
export function getStoryAudioUrls(script, voiceId = 'aria') {
  const lang = VOICE_LANG_MAP[voiceId.toLowerCase()] || 'en-GB';
  try {
    // splits long scripts into sentences under 200 chars
    const results = googleTTS.getAllAudioUrls(script, {
      lang,
      slow: false,
      host: 'https://translate.google.com',
      timeout: 10000,
    });
    return results.map((r) => r.url);
  } catch (err) {
    console.error('Error generating story audio URLs:', err.message);
    return [];
  }
}

/**
 * Get single combined audio URL or first chunk
 */
export function getStoryAudioUrl(titleOrExcerpt, voiceId = 'aria') {
  const lang = VOICE_LANG_MAP[voiceId.toLowerCase()] || 'en-GB';
  const cleanText = titleOrExcerpt.slice(0, 190);
  try {
    return googleTTS.getAudioUrl(cleanText, {
      lang,
      slow: false,
      host: 'https://translate.google.com',
      timeout: 10000,
    });
  } catch (err) {
    console.error('Error generating story audio URL:', err.message);
    return null;
  }
}
