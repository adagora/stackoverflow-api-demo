export interface ITag {
  name: string;
  count: number;
  collectives: Array<{
    description: string;
    external_links: Array<{
      type: string;
      link: string;
    }>;
    link: string;
    name: string;
    slug: string;
    tags: string[];
  }>;
}
