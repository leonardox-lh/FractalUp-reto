interface Continent {
  name: string;
}

interface Languages {
  name: string;
}

interface States {
  name: string;
}

export interface Country {
  code: string;
  name: string;
  capital: string;
  currency: string;
  flag: string;
  img: string;
  continent: Continent;
  languages: Languages[];
  states: States;
}
