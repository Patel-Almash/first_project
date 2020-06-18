import { EntitySchema } from 'typeorm';

export default new EntitySchema({
  name: "Admin", //modelName
  tableName: "admins",  //TableName
  columns: {
    id: 
    {
      primary: true,
      type: 'uuid',
      generated: true
    },
    name: 
    {
      type: 'varchar'
    },
    email: 
    {
      type: 'varchar'
    },
    created_at: 
    {
      type: 'datetime'
    },
    updated_at:{
      type: 'datetime'
    }
  }
})