// Lightweight SplitText replacement (free)
// Wraps each word (and optionally each char) in inline-block spans.

export type SplitMode = "words" | "chars" | "lines-words";

export interface SplitResult {
  words: HTMLElement[];
  chars: HTMLElement[];
  cleanup: () => void;
}

export function splitText(el: HTMLElement, mode: SplitMode = "words"): SplitResult {
  const original = el.innerHTML;
  const text = el.textContent || "";
  el.innerHTML = "";

  const words: HTMLElement[] = [];
  const chars: HTMLElement[] = [];

  // Split by whitespace, preserving spaces
  const tokens = text.split(/(\s+)/);

  tokens.forEach((token) => {
    if (/^\s+$/.test(token)) {
      el.appendChild(document.createTextNode(" "));
      return;
    }
    if (!token) return;

    const wordWrap = document.createElement("span");
    wordWrap.className = "reveal-word";
    wordWrap.style.display = "inline-block";
    wordWrap.style.willChange = "transform, opacity";

    if (mode === "chars") {
      Array.from(token).forEach((ch) => {
        const c = document.createElement("span");
        c.className = "reveal-char";
        c.style.display = "inline-block";
        c.textContent = ch;
        wordWrap.appendChild(c);
        chars.push(c);
      });
    } else {
      wordWrap.textContent = token;
    }

    el.appendChild(wordWrap);
    words.push(wordWrap);
  });

  return {
    words,
    chars,
    cleanup: () => {
      el.innerHTML = original;
    },
  };
}
