type Order = {
    _id: string;
    address: string;
    amount: string;
    description: string;
    email: string;
    image: string;
    link: string;
    name: string;
    phone: string;
    price: string;
    product: string;
    size: string;
    surName: string;
    warehouse: string;
}

type Product = {
    _id: string;
    name: string;
    imgSrc: string;
    prices: any[];
    sizeFlag: boolean;
    outdoor: boolean;
    sizes: string[];
}