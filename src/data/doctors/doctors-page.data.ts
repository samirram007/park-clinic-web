import type { Doctor } from './doctor';

export const doctorsPageData: {
  header: { title: string; description: string };
  doctors: Doctor[];
} = {
  header: {
    title: 'Our Doctors',
    description: 'Meet our team of experienced medical professionals dedicated to your health and wellness.',
  },
  doctors: [
    {
      id: 1,
      name: 'Dr. Uttara Chatterjee',
      title: 'Pathologist',
      experience: '15 years',
      rating: 4.8,
      image: '/images/doc2.jpg',
    },
    {
      id: 2,
      name: 'Dr. Pauline Ara Parveen',
      title: 'Pathologist',
      experience: '12 years',
      rating: 4.6,
      image: '/images/doc1.jpg',
    },
    {
      id: 3,
      name: 'Dr. Sandip Kr. Batabyal',
      title: 'Pathologist',
      experience: '11 years',
      rating: 4.5,
      image: '/images/doc1.jpg',
    },
    {
      id: 4,
      name: 'Dr. Rituparna Haldar',
      title: 'Pathologist',
      experience: '9 years',
      rating: 4.4,
      image: '/images/doc2.jpg',
    }, 
    {
      id: 5,
      name: 'Dr. Molay Roy',
      title: 'Pathologist',
      experience: '12 years',
      rating: 4.7,
      image: '/images/doc1.jpg',
    },
    {
      id: 6,
      name: 'Dr. Shweta Khanna',
      title: 'Radiologist',
      experience: '10 years',
      rating: 4.6,
      image: '/images/doc1.jpg',
    },
    {
      id: 7,
      name: 'Dr. Souvik Ghosh',
      title: 'Radiologist',
      experience: '10 years',
      rating: 4.6,
      image: '/images/doc1.jpg',
    },
    {
      id: 8,
      name: 'Dr. Debleena Mondal',
      title: 'Radiologist',
      experience: '8 years',
      rating: 4.9,
      image: '/images/doc1.jpg',
    },
    {
      id: 9,
      name: 'Dr. Adeep V',
      title: 'Radiologist',
      experience: '8 years',
      rating: 4.9,
      image: '/images/doc1.jpg',
    },
    {
      id: 10,
      name: 'Dr. Shyamajit Samaddar',
      title: 'Cardiologist',
      experience: '9 years',
      rating: 4.5,
      image: '/images/doc1.jpg',
    },
    {
      id: 11,
      name: 'Dr. Lopamudra Mishra',
      title: 'Cardiologist',
      experience: '9 years',
      rating: 4.5,
      image: '/images/doc1.jpg',
    },
    {
      id: 12,
      name: 'Dr. P. Bhowmik',
      title: 'Cardiologist',
      experience: '9 years',
      rating: 4.5,
      image: '/images/doc1.jpg',
    },
  ],
};
