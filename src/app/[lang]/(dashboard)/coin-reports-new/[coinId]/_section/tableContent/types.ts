export type Section = {
  title: string;
  description: string;
};

export type ContentData = {
  [key: string]: {
    title: string;
    sections: Section[];
  };
};

export type SelectedTabKey = keyof ContentData;
