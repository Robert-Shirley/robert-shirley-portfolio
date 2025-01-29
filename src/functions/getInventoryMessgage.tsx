export function getInventoryMessage(inventoryCount: number) {
  if (inventoryCount === 0) {
    return (
      <span className="text-sm text-red-600 font-medium">Out of stock</span>
    );
  }
  if (inventoryCount <= 20) {
    return (
      <span className="text-sm text-yellow-600 font-medium">
        Order now! Only {inventoryCount} left!
      </span>
    );
  }
  return <span className="text-sm text-gray-500 font-medium">In stock</span>;
}
