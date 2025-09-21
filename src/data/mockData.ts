// Mock data for the Farmers' Marketplace

export interface Crop {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  location: string;
  quality: 'A' | 'B' | 'C';
  organic: boolean;
  image: string;
  farmer: {
    name: string;
    rating: number;
    id: string;
  };
  description: string;
}

export interface Order {
  id: string;
  cropId: string;
  cropName: string;
  quantity: number;
  price: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  farmer: string;
  buyer: string;
}

export interface Farmer {
  id: string;
  name: string;
  email: string;
  location: string;
  rating: number;
  totalCrops: number;
  joinDate: string;
}

export interface Buyer {
  id: string;
  name: string;
  email: string;
  location: string;
  totalOrders: number;
  joinDate: string;
}

// Mock crops data
export const mockCrops: Crop[] = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
    quantity: 100,
    unit: 'kg',
    price: 20,
    location: 'Lucknow, UP',
    quality: 'A',
    organic: true,
    image: 'https://images.unsplash.com/photo-1546470427-5a2b8b3b8b3b?w=400',
    farmer: {
      name: 'Rajesh Kumar',
      rating: 4.8,
      id: 'f1'
    },
    description: 'Fresh, organic tomatoes grown with natural fertilizers'
  },
  {
    id: '2',
    name: 'Red Onions',
    quantity: 150,
    unit: 'kg',
    price: 15,
    location: 'Nashik, Maharashtra',
    quality: 'A',
    organic: false,
    image: 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=400',
    farmer: {
      name: 'Priya Sharma',
      rating: 4.6,
      id: 'f2'
    },
    description: 'Premium quality red onions, perfect for cooking'
  },
  {
    id: '3',
    name: 'Wheat Grain',
    quantity: 500,
    unit: 'kg',
    price: 25,
    location: 'Punjab',
    quality: 'A',
    organic: true,
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400',
    farmer: {
      name: 'Amar Singh',
      rating: 4.9,
      id: 'f3'
    },
    description: 'High-quality wheat grain, perfect for flour making'
  },
  {
    id: '4',
    name: 'Green Peas',
    quantity: 80,
    unit: 'kg',
    price: 35,
    location: 'Karnataka',
    quality: 'B',
    organic: true,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    farmer: {
      name: 'Suresh Reddy',
      rating: 4.4,
      id: 'f4'
    },
    description: 'Fresh green peas, harvested at peak ripeness'
  },
  {
    id: '5',
    name: 'Carrots',
    quantity: 120,
    unit: 'kg',
    price: 18,
    location: 'Himachal Pradesh',
    quality: 'A',
    organic: false,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
    farmer: {
      name: 'Meera Devi',
      rating: 4.7,
      id: 'f5'
    },
    description: 'Crisp and sweet carrots, rich in vitamins'
  },
  {
    id: '6',
    name: 'Potatoes',
    quantity: 200,
    unit: 'kg',
    price: 12,
    location: 'Uttar Pradesh',
    quality: 'B',
    organic: false,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
    farmer: {
      name: 'Vikram Singh',
      rating: 4.3,
      id: 'f6'
    },
    description: 'Fresh potatoes, perfect for all cooking needs'
  }
];

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: 'o1',
    cropId: '1',
    cropName: 'Fresh Tomatoes',
    quantity: 50,
    price: 1000,
    status: 'delivered',
    orderDate: '2024-01-15',
    farmer: 'Rajesh Kumar',
    buyer: 'John Doe'
  },
  {
    id: 'o2',
    cropId: '2',
    cropName: 'Red Onions',
    quantity: 30,
    price: 450,
    status: 'shipped',
    orderDate: '2024-01-18',
    farmer: 'Priya Sharma',
    buyer: 'Jane Smith'
  },
  {
    id: 'o3',
    cropId: '3',
    cropName: 'Wheat Grain',
    quantity: 100,
    price: 2500,
    status: 'pending',
    orderDate: '2024-01-20',
    farmer: 'Amar Singh',
    buyer: 'Mike Johnson'
  }
];

// Mock farmers data
export const mockFarmers: Farmer[] = [
  {
    id: 'f1',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    location: 'Lucknow, UP',
    rating: 4.8,
    totalCrops: 12,
    joinDate: '2023-01-15'
  },
  {
    id: 'f2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    location: 'Nashik, Maharashtra',
    rating: 4.6,
    totalCrops: 8,
    joinDate: '2023-03-20'
  },
  {
    id: 'f3',
    name: 'Amar Singh',
    email: 'amar@example.com',
    location: 'Punjab',
    rating: 4.9,
    totalCrops: 15,
    joinDate: '2022-11-10'
  }
];

// Mock buyers data
export const mockBuyers: Buyer[] = [
  {
    id: 'b1',
    name: 'John Doe',
    email: 'john@example.com',
    location: 'Mumbai, Maharashtra',
    totalOrders: 25,
    joinDate: '2023-02-01'
  },
  {
    id: 'b2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    location: 'Delhi',
    totalOrders: 18,
    joinDate: '2023-04-15'
  },
  {
    id: 'b3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    location: 'Bangalore, Karnataka',
    totalOrders: 32,
    joinDate: '2022-12-05'
  }
];
