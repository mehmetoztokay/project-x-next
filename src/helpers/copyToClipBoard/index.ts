export const copyToClipboard = (text: string, setCopied?: React.Dispatch<React.SetStateAction<boolean>>, setCopiedTimeout?: number) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      setCopied && setCopied(true);
      setTimeout(() => {
        setCopied && setCopied(false);
      }, setCopiedTimeout || 500);
    })
    .catch((err) => {
      console.error("Copy error:", err);
    });
};
