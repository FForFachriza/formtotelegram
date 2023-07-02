export default function textTemplate(sender: string, tanggal: Date | string, pesan: string, subject: string): string {
  return `Pesan Oleh: ${sender}\nDikirim Pada: ${tanggal}\nSubject Pesan: ${subject}\nIsi Pesan:${pesan}`;
}
