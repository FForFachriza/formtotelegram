export default function textTemplate(sender: string, tanggal: Date | string, pesan: string, subject: string): string {
  return `<b>Pesan Oleh:</b> ${sender}\n<b>Dikirim Pada:</b> ${tanggal}\n<b>Subject Pesan:</b> ${subject}\n<b>Isi Pesan:</b> ${pesan}`;
}
