export const copyToClipboard = (text: string, setCopied?: React.Dispatch<React.SetStateAction<boolean>>, setCopiedTimeout?: number) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      setTimeout(() => {
        setCopied && setCopied(true);
      }, setCopiedTimeout);
    })
    .catch((err) => {
      console.error("Copy error:", err);
    });
};
