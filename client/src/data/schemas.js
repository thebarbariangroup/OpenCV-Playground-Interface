export default [

  {
    category: 'alter',
    name: 'grayscale',
    label: 'Grayscale',
    conf: { args: [] },
  },

  {
    category: 'alter',
    name: 'setChannel',
    label: 'Set RGBA',
    conf: {
      args: [
        {
          name: 'idx',
          label: 'Channel',
          input: {
            type: 'radio',
            values: [
              { k: 'red', v: 0 },
              { k: 'green', v: 1 },
              { k: 'blue', v: 2 },
              { k: 'alpha', v: 3 },
            ],
            defaultValue: 3,
          },
        },
        {
          name: 'val',
          label: 'Value',
          input: {
            type: 'slider',
            range: [0, 255],
            defaultValue: 255,
          },
        },
      ],
    }
  },

  {
    category: 'featureDetect',
    name: 'canny',
    label: 'Canny Edge Detection',
    conf: {
      args: [
        {
          name: 't1',
          label: 'Threshold 1',
          input: {
            type: 'slider',
            range: [0, 255],
            defaultValue: 50,
          },
        },
        {
          name: 't2',
          label: 'Threshold 2',
          input: {
            type: 'slider',
            range: [0, 255],
            defaultValue: 50,
          },
        },
      ]
    }
  },

];