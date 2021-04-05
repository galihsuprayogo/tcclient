import { dummyUMKM, dummyDirection, dummyStart } from '../../../assets';

export default DataIntro = {
  data: [
    {
      key: 'one',
      title: 'Menggunakan Lokasi Anda',
      text: 'Pengguna yang terhormat, aplikasi ini meminta izin untuk mengakses lokasi anda secara berkala.',
      description: '',
      photo: '',
      photoSecond: ''
    },
    {
      key: 'two',
      title: 'Lokasi Rumah Petani atau UMKM',
      text: 'Untuk menyimpan rumah anda, setujui konfirmasi akses lokasi anda secara berkala.',
      description: 'TCoffe Aplikasi akan menampilkan peta kec. kledung kab. Temanggung dan alamat anda.',
      photo: dummyUMKM,
      photoSecond: ''
    },
    {
      key: 'three',
      title: 'Navigasi Pembeli atau Konsumen',
      text: 'Untuk menampilkan peta hasil pencarian kopi, aplikasi ini meminta persetujuan pembeli.',
      description: 'TCoffe Aplikasi akan menampilkan peta, jarak, dan arah navigasi.',
      photo: dummyDirection,
      photoSecond: dummyStart
    }
  ]
};
