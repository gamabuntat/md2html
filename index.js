export function md2html(md) {
  return md.replace(/(?<=\n|^)(>+.*?)(?=(\n[^>]|$))/gs, (match) => {
    let gtsCount = 0;
    const result = match.replace(
      /(^>+) *(#*) *(.*)$/gm,
      (_, gts, signs, content) => {
        const diff = gts.length - gtsCount;
        gtsCount = gts.length;
        const blockquotes = Array.from({ length: Math.abs(diff) })
          .fill(`<${diff < 0 ? '/' : ''}blockquote>`)
          .join('');
        const nSigns = Math.min(signs.length, 6);
        const tag = nSigns > 0 ? `h${nSigns}` : 'p';

        return `${blockquotes}${content ? `<${tag}>${content}</${tag}>` : ''}`;
      }
    );

    return (
      result + Array.from({ length: gtsCount }).fill('</blockquote>').join('')
    );
  });
}
