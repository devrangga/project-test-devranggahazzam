export interface Header {
  label: string;
}

export const header: Header[] = [
  {
    label: "Work",
  },
  {
    label: "About",
  },
  {
    label: "Services",
  },
  {
    label: "Ideas",
  },
  {
    label: "Careers",
  },
  {
    label: "Contact",
  },
];

export interface ListPostProps {
  index: number;
  item: {
    published_at: string;
    title: string;
    content: string[];
  };
}
