const { Users, Flavors } = require("../models");

Flavors.bulkCreate(
  [
    { name: "Bug", images: "/images/1.jpeg" },
    { name: "Pickiling", images: "/images/2.jpeg" },
    { name: "Red Velvet Ice Cream", images: "/images/3.jpeg" },
    { name: "Bubble Gum Ice Cream", images: "/images/4.jpeg" },
    { name: "French Vanilla Ice Cream", images: "/images/5.jpeg" },
    { name: "Building", images: "/images/6.jpeg" },
    { name: "Strawberry", images: "/images/7.jpeg" },
    { name: "Neopolitan", images: "/images/8.jpeg" },
    { name: "Chocolate Chip Ice Cream", images: "/images/9.jpeg" },
    { name: "Strawberry Cheescake", images: "/images/10.jpeg" },
  ],
  {
    ignoreDuplicates: true,
  }
).then(() => console.log("Flavors data have been saved"));
