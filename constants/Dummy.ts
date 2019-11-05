import { File } from './Interfaces';

const DUMMY_FILES: File[] = [
  {
    uri: 'phone/somelocation/drumsample.mp4',
    name: 'drumsample',
    isDirectory: false,
    children: [],
  },
  {
    uri: 'phone/somelocation/birds.mp4',
    name: 'birds',
    isDirectory: false,
    children: [],
  },
  {
    uri: 'phone/somelocation/moresounds',
    name: 'moresounds',
    isDirectory: true,
    children: [
      {
        uri: 'phone/somelocation/allstar.mp4',
        name: 'allstar',
        isDirectory: false,
        children: [],
      },
    ],
  },
  {
    uri: 'phone/somelocation/drumsaaasdfasdfasdfmple.mp4',
    name: 'drumsample',
    isDirectory: false,
    children: [],
  },
  {
    uri: 'phone/somelocation/birasdfds.mp4',
    name: 'birds',
    isDirectory: false,
    children: [],
  },
  {
    uri: 'phone/somelocation/mordasfsadfesounds',
    name: 'moresounds',
    isDirectory: true,
    children: [
      {
        uri: 'phone/somelocation/allsadsfasdfasdftar.mp4',
        name: 'allstar',
        isDirectory: false,
        children: [],
      },
    ],
  },
  {
    uri: 'phone/somelocation/drumadsgssagsample.mp4',
    name: 'drumsample',
    isDirectory: false,
    children: [],
  },
  {
    uri: 'phone/somelocation/biagsggrds.mp4',
    name: 'birds',
    isDirectory: false,
    children: [],
  },
  {
    uri: 'phone/somelocation/moreasggaergsounds',
    name: 'moresounds',
    isDirectory: true,
    children: [
      {
        uri: 'phone/somelocation/alfadgagaglstar.mp4',
        name: 'allstar',
        isDirectory: false,
        children: [],
      },
    ],
  },
  {
    uri: 'phone/somelocation/dru23453245msample.mp4',
    name: 'drumsample',
    isDirectory: false,
    children: [],
  },
  {
    uri: 'phone/somelocation/bir23452345ds.mp4',
    name: 'birds',
    isDirectory: false,
    children: [],
  },
  {
    uri: 'phone/somelocation/mor23452345esounds',
    name: 'moresounds',
    isDirectory: true,
    children: [
      {
        uri: 'phone/somelocation/alls23452345tar.mp4',
        name: 'allstar',
        isDirectory: false,
        children: [],
      },
    ],
  },
];

const Dummy = {
  files: DUMMY_FILES,
};

export default Dummy;
