import React, { useState } from 'react';
import TableComponent from './table/TableComponent'; // Import the child table component

const ParentComponent = () => {
  const initialData = [
    {
      id: '1cc542f3-8c78-4ea7-bc2a-fdffd5b9e0f6',
      qty: 0,
      rate: 0,
      notes: null,
      hsn: '7306',
      item_name: 'Copper PIPE HARD 1-5/8" (41.3mm)',
      item_desc: null,
      brand: null,
      brand_name: null,
      category: '1a5bf5aa-b9e3-4f88-8aa6-cb34d9c9a541',
      category_name: 'VRF',
      uom: '531d61fa-3a5b-4037-8897-e41514b510cc',
      uom_name: 'MTR',
      code: 'ITEM-00075',
      price: 0,
      total: 0,
      uom_code: 'UOM-00009',
      parent_name: null,
      parent_code: null,
    },
    {
      id: '14240284-9441-4daf-bf43-97d3a66af662',
      qty: 4,
      rate: 154,
      notes: null,
      hsn: '7306',
      item_name: 'Copper PIPE HARD 7/8" (22.2mm)',
      item_desc: null,
      brand: null,
      brand_name: null,
      category: '1a5bf5aa-b9e3-4f88-8aa6-cb34d9c9a541',
      category_name: 'VRF',
      uom: '531d61fa-3a5b-4037-8897-e41514b510cc',
      uom_name: 'MTR',
      code: 'ITEM-00069',
      price: 154,
      total: 616,
      uom_code: 'UOM-00009',
      parent_name: null,
      parent_code: null,
    },
    {
      id: '234ad2f9-efcb-4ad2-b2b2-70947e1b663d',
      qty: 10,
      rate: 200,
      notes: 'Special requirement',
      hsn: '7306',
      item_name: 'Steel PIPE HARD 2" (50.8mm)',
      item_desc: 'High strength steel pipe',
      brand: 'SteelCo',
      brand_name: 'SteelCo',
      category: '1a5bf5aa-b9e3-4f88-8aa6-cb34d9c9a541',
      category_name: 'VRF',
      uom: '531d61fa-3a5b-4037-8897-e41514b510cc',
      uom_name: 'MTR',
      code: 'ITEM-00085',
      price: 200,
      total: 2000,
      uom_code: 'UOM-00009',
      parent_name: null,
      parent_code: null,
    },
    {
      id: '450bdf3c-d409-4c6f-80a7-efb89f6c9b32',
      qty: 3,
      rate: 180,
      notes: 'Urgent delivery required',
      hsn: '7306',
      item_name: 'Brass PIPE SOFT 3/4" (19.05mm)',
      item_desc: 'Flexible brass pipe',
      brand: 'BrassWorks',
      brand_name: 'BrassWorks',
      category: '1a5bf5aa-b9e3-4f88-8aa6-cb34d9c9a541',
      category_name: 'VRF',
      uom: '531d61fa-3a5b-4037-8897-e41514b510cc',
      uom_name: 'MTR',
      code: 'ITEM-00099',
      price: 180,
      total: 540,
      uom_code: 'UOM-00009',
      parent_name: null,
      parent_code: null,
    },
    {
      id: '2cdde454-d5bc-4a21-9e53-9940c9b9c1ff',
      qty: 5,
      rate: 120,
      notes: null,
      hsn: '7306',
      item_name: 'Copper PIPE HARD 1/2" (12.7mm)',
      item_desc: null,
      brand: 'CopperMax',
      brand_name: 'CopperMax',
      category: '1a5bf5aa-b9e3-4f88-8aa6-cb34d9c9a541',
      category_name: 'VRF',
      uom: '531d61fa-3a5b-4037-8897-e41514b510cc',
      uom_name: 'MTR',
      code: 'ITEM-00072',
      price: 120,
      total: 600,
      uom_code: 'UOM-00009',
      parent_name: null,
      parent_code: null,
    },
    {
      id: '1da50333-d8e3-4fa3-9a8b-35e9b999db4d',
      qty: 7,
      rate: 210,
      notes: null,
      hsn: '7306',
      item_name: 'Stainless Steel PIPE 3/4" (19.05mm)',
      item_desc: null,
      brand: 'StainlessMaster',
      brand_name: 'StainlessMaster',
      category: '1a5bf5aa-b9e3-4f88-8aa6-cb34d9c9a541',
      category_name: 'VRF',
      uom: '531d61fa-3a5b-4037-8897-e41514b510cc',
      uom_name: 'MTR',
      code: 'ITEM-00083',
      price: 210,
      total: 1470,
      uom_code: 'UOM-00009',
      parent_name: null,
      parent_code: null,
    },
    {
      id: '3275c317-91a6-43b9-b268-5f2f63b3316b',
      qty: 12,
      rate: 140,
      notes: 'Discount applied',
      hsn: '7306',
      item_name: 'Galvanized PIPE HARD 1" (25.4mm)',
      item_desc: null,
      brand: 'GalvTech',
      brand_name: 'GalvTech',
      category: '1a5bf5aa-b9e3-4f88-8aa6-cb34d9c9a541',
      category_name: 'VRF',
      uom: '531d61fa-3a5b-4037-8897-e41514b510cc',
      uom_name: 'MTR',
      code: 'ITEM-00093',
      price: 140,
      total: 1680,
      uom_code: 'UOM-00009',
      parent_name: null,
      parent_code: null,
    },
    {
      id: 'c821f9ff-97a4-4917-a0cb-4d9fd50c7e8d',
      qty: 9,
      rate: 175,
      notes: null,
      hsn: '7306',
      item_name: 'Iron PIPE HARD 1-1/4" (31.75mm)',
      item_desc: null,
      brand: 'IronForge',
      brand_name: 'IronForge',
      category: '1a5bf5aa-b9e3-4f88-8aa6-cb34d9c9a541',
      category_name: 'VRF',
      uom: '531d61fa-3a5b-4037-8897-e41514b510cc',
      uom_name: 'MTR',
      code: 'ITEM-00077',
      price: 175,
      total: 1575,
      uom_code: 'UOM-00009',
      parent_name: null,
      parent_code: null,
    },
    {
      id: '0a4a674e-6806-483b-9f7f-e92ed16ab3c4',
      qty: 8,
      rate: 250,
      notes: null,
      hsn: '7306',
      item_name: 'Aluminum PIPE HARD 2" (50.8mm)',
      item_desc: null,
      brand: 'AluPro',
      brand_name: 'AluPro',
      category: '1a5bf5aa-b9e3-4f88-8aa6-cb34d9c9a541',
      category_name: 'VRF',
      uom: '531d61fa-3a5b-4037-8897-e41514b510cc',
      uom_name: 'MTR',
      code: 'ITEM-00100',
      price: 250,
      total: 2000,
      uom_code: 'UOM-00009',
      parent_name: null,
      parent_code: null,
    },
    {
      id: '8e7d95c3-0a98-4d8a-9bcf-50f4dfbebd0f',
      qty: 6,
      rate: 300,
      notes: 'Premium material',
      hsn: '7306',
      item_name: 'Titanium PIPE HARD 3" (76.2mm)',
      item_desc: null,
      brand: 'TitanCo',
      brand_name: 'TitanCo',
      category: '1a5bf5aa-b9e3-4f88-8aa6-cb34d9c9a541',
      category_name: 'VRF',
      uom: '531d61fa-3a5b-4037-8897-e41514b510cc',
      uom_name: 'MTR',
      code: 'ITEM-00112',
      price: 300,
      total: 1800,
      uom_code: 'UOM-00009',
      parent_name: null,
      parent_code: null,
    },
  ];

  const columns = [
    {
      Header: 'Sl. No.',
      accessor: (row, i) => i + 1, // index + 1 to get row number
    },
    {
      Header: 'Item Name',
      accessor: 'item_name',
    },
    {
      Header: 'Item Code',
      accessor: 'code',
    },
    {
      Header: 'Parent Item',
      accessor: 'parent_name',
    },
    {
      Header: 'Parent Code',
      accessor: 'parent_code',
    },
    {
      Header: 'Category',
      accessor: 'category_name',
    },
    {
      Header: 'Brand',
      accessor: 'brand_name',
    },
    {
      Header: 'Rate',
      accessor: 'rate',
    },
    {
      Header: 'Quantity',
      accessor: 'qty',
    },
    {
      Header: 'Received Quantity',
      accessor: 'received_quantity',
      editable: true, // This column is editable
    },
    {
      Header: 'Rejected Quantity',
      accessor: 'rejected_quantity',
      editable: true, // This column is editable
    },
    {
      Header: 'Comment',
      accessor: 'notes',
      editable: true, // This column is editable
    },
  ];

  const [tableData, setTableData] = useState(initialData);

  const handleDataChange = (updatedData) => {
    // Receive the updated data from the child
    setTableData(updatedData);
    console.log('Updated Data:', updatedData); // Log the updated data or process it further
  };

  return (
    <div>
      <h2>Editable Table</h2>
      <TableComponent
        data={tableData}
        columns={columns}
        onDataChange={handleDataChange}
      />
      <button onClick={() => console.log('Final Data: ', tableData)}>
        Log Final Data
      </button>
    </div>
  );
};

export default ParentComponent;
