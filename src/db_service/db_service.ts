import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {Users,Companys,Branches} from '../model/AppSchema';

  const tableName = 'userDetails';
  const tableName1 = 'companyDetails';
  const tableName2 = 'branchDetails';
  
  enablePromise(true);
  
  export const getDBConnection = async () => {
    return openDatabase({name: 'logface-data.db', location: 'default'});
  };
  
   export const createTable = async (db: SQLiteDatabase) => {
    
    db.executeSql('PRAGMA foreign_keys = ON');
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}( user_id INTEGER PRIMARY KEY, name TEXT NOT NULL, mobileNo TEXT NOT NULL, email TEXT NOT NULL );`;
      const query1 = `CREATE TABLE IF NOT EXISTS ${tableName1}( cop_id INTEGER PRIMARY KEY, company TEXT NOT NULL, caddress TEXT NOT NULL, branchcnt INTEGER NOT NULL, ctechnology TEXT NOT NULL, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES ${tableName} (user_id) );`;
    const query2 = `CREATE TABLE IF NOT EXISTS ${tableName2}( bh_id INTEGER, branch TEXT NOT NULL, baddress TEXT NOT NULL, employeecnt INTEGER NOT NULL, btechnology TEXT NOT NULL, cop_id INTEGER, FOREIGN KEY (cop_id) REFERENCES ${tableName1} (cop_id) ON DELETE CASCADE );`;
    try {
      
      await db.executeSql(query)
      await db.executeSql(query1)
      await db.executeSql(query2)
    } catch (error) {
      console.error(error)
      throw Error(`Failed to create tables`)
    }
  };
  
  export const saveUserItems = async (
    db: SQLiteDatabase,
    userItems: Users[],
  ) => {
    const insertQuery =
      `INSERT OR REPLACE INTO ${tableName}(rowid, name, mobileNo,email) values` +
      userItems.map(i => `(${i.user_id}, '${i.name}', '${i.mobileNo}', '${i.email}')`).join(',');
  
    return db.executeSql(insertQuery);
  };
  
  export const getUsers = async (db: SQLiteDatabase): Promise<Users[]> => {
    try {
      const userItems: Users[] = [];
      const results = await db.executeSql(
        `SELECT * FROM ${tableName}`,
      );
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          userItems.push(result.rows.item(index));
        }
      });
      return userItems;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get todoItems !!!');
    }
  };
  export const getCompanyList = async (db: SQLiteDatabase, user_id: number): Promise<Companys[]> => {
    try {
      console.log(user_id)
      const companyItems: Companys[] = [];
      const results = await db.executeSql(
        `SELECT * FROM ${tableName1} WHERE user_id = ${user_id}`,
      );
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          companyItems.push(result.rows.item(index));
        }
      });
      return companyItems;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get todoItems !!!');
    }
  };
  export const getBranchList = async (db: SQLiteDatabase, companyId:number): Promise<Branches[]> => {
    try {
      const branchItems: Branches[] = [];
      const results = await db.executeSql(
        `SELECT * FROM ${tableName2} WHERE cop_id = ${companyId}`,
      );
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          branchItems.push(result.rows.item(index));
        }
      });
      
      return branchItems;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get todoItems !!!');
    }
  };
  
  export const saveCompanyItems = async (
    db: SQLiteDatabase,
    comapnyItems: Companys[],
  ) => {
    const insertQuery =
      `INSERT OR REPLACE INTO ${tableName1}(cop_id, company, caddress,branchcnt,ctechnology,user_id) values` +
      comapnyItems.map(i => `('${i.cop_id}', '${i.company}', '${i.caddress}','${i.branchcnt}','${i.ctechnology}','${i.user_id}')`).join(',');
  
    return db.executeSql(insertQuery);
  };
  export const saveBranchItems = async (
    db: SQLiteDatabase,
    branchItems: Branches[],
  ) => {
    const insertQuery =
      `INSERT INTO ${tableName2}(bh_id, branch, baddress,employeecnt,btechnology,cop_id) values` +
      branchItems.map(i => `('${i.bh_id}', '${i.branch}', '${i.baddress}','${i.employeecnt}','${i.btechnology}','${i.cop_id}')`).join(',');
 
    return db.executeSql(insertQuery);
  };

  export const updateBranchItems = async (
    db: SQLiteDatabase,
    branchItems: Branches[],
    id:number, 
    companyId: number
  ) => {
    const insertQuery =
   `UPDATE ${tableName2} SET ` +
   branchItems.map(i => `branch = '${i.branch}', baddress = '${i.baddress}', employeecnt = '${i.employeecnt}', btechnology = '${i.btechnology}' `) + 
   `WHERE bh_id = ${id} AND cop_id = ${companyId}`;
console.log(insertQuery)

    return db.executeSql(insertQuery);
  };
  
  export const deleteCompanyItem = async (db: SQLiteDatabase, id: number,user_id:number) => {
    try {
    const deleteQuery = `DELETE from ${tableName1} where ( cop_id = ${id} AND user_id = ${user_id})`;
    console.log(deleteQuery)
    await db.executeSql(deleteQuery);
  } catch (error) {
    console.error("DE",error);
    throw Error('Failed to get todoItems !!!');
  }
  };
  export const deleteBranchItem = async (db: SQLiteDatabase, id:number, companyId: number) => {
    const deleteQuery = `DELETE from ${tableName2} where ( bh_id = ${id} AND cop_id = ${companyId})`;
    await db.executeSql(deleteQuery);
  };
  export const deleteTable = async (db: SQLiteDatabase,table_Name:string) => {
    const query = `drop table ${table_Name}`;
  
    await db.executeSql(query);
  };



