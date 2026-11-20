import { useState } from "react";

const covers = {
  Novels: { emoji: "📕", tint: "#f6e3e3" },
  Tech: { emoji: "💻", tint: "#dfe9f5" },
  Kids: { emoji: "🧸", tint: "#f7f0cf" },
  "Self-help": { emoji: "🌱", tint: "#e3f0e6" },
};

// Shows the book image; if it is missing or fails to load, shows an emoji cover instead
function BookCover({ book, className }) {
  const [failed, setFailed] = useState(false);
  const cover = covers[book.category] || { emoji: "📚", tint: "#eee" };

  if (!book.imageUrl || failed) {
    return (
      <div className={`${className} cover-fallback`} style={{ background: cover.tint }}>
        {cover.emoji}
      </div>
    );
  }
  return (
    <img className={className} src={book.imageUrl} alt={book.name} onError={() => setFailed(true)} />
  );
}

export default BookCover;
