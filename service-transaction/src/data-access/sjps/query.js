const query = ({ connects, models }) => {
    return Object.freeze({
      insertNewSjp,
      checkNameExist,
      checkTruck,
      getTrxNumber,
      getLogNumber,
      selectAll,
      selectOne,
      checkNameExistUpdate,
      changeDestination,
      deleteSjp,
      changeTruck,
      recordAllTransaction,
      exportAll,
      getCompanyDetail,
      getTruckDetail
    });
  
    async function deleteSjp({ id }) {
      try {
        // use sequelize on inserting
        const Sjp = models.Sjps;
        const res = await Sjp.update(
          {
            is_deleted: 1,
          },
          {
            where: {
              id,
            },
          }
        );
        return res;
      } catch (e) {
        console.log("Error: ", e);
      }
    }
  
    async function insertNewSjp({ data }) {
      try {
        // use sequelize on inserting
        const Sjp = models.Sjps;
        const res = await Sjp.create(data);
        return res;
      } catch (e) {
        console.log("Error: ", e);
      }
    }

    async function getTrxNumber() {
      try {
        const pool = await connects();

        // get month and year
        const d = new Date();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        var formatedMonth;
        if (month != '10' || month != '11' || month != '12') {
          formatedMonth = '0' + month
        } else {
          formatedMonth = month
        }

        // query trx number
        const res = await new Promise((resolve) => {
          const sql = `SELECT * FROM "mst_trx_number" WHERE "trx_type" = $1 AND "month" = $2 AND "year" = $3;`;
          const params = ['SJP', formatedMonth, year];
          pool.query(sql, params, (err, res) => {
  
            if (err) resolve(err);
            resolve(res);
          });
        });
        
        if (res.rowCount > 0) {
          console.log(res);
          return res;
        } else {
          // create txr number if not exist
          const TrxNumber = models.TrxNumbers;
          const resAdd = await TrxNumber.create({
            trx_type: 'SJP',
            code: '1',
            month: formatedMonth,
            year: year,
            increment_number: 0
          });

          // query trx number
          const res = await new Promise((resolve) => {
            const sql = `SELECT * FROM "mst_trx_number" WHERE "trx_type" = $1 AND "month" = $2 AND "year" = $3;`;
            const params = ['SJP', formatedMonth, year];
            pool.query(sql, params, (err, res) => {
              pool.end(); // end connection
    
              if (err) resolve(err);
              resolve(res);
            });
          });
          console.log(res);
          return res;
        }
        
      } catch (e) {
        console.log("Error: ", e);
      }
    }

    async function getLogNumber() {
      try {
        const pool = await connects();

        // get month and year
        const d = new Date();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        var formatedMonth;
        if (month != '10' || month != '11' || month != '12') {
          formatedMonth = '0' + month
        } else {
          formatedMonth = month
        }

        // query trx number
        const res = await new Promise((resolve) => {
          const sql = `SELECT * FROM "mst_trx_number" WHERE "trx_type" = $1 AND "month" = $2 AND "year" = $3;`;
          const params = ['LOG', formatedMonth, year];
          pool.query(sql, params, (err, res) => {
  
            if (err) resolve(err);
            resolve(res);
          });
        });
        
        if (res.rowCount > 0) {
          console.log(res);
          return res;
        } else {
          // create txr number if not exist
          const TrxNumber = models.TrxNumbers;
          const resAdd = await TrxNumber.create({
            trx_type: 'LOG',
            code: '99',
            month: formatedMonth,
            year: year,
            increment_number: 0
          });

          // query trx number
          const res = await new Promise((resolve) => {
            const sql = `SELECT * FROM "mst_trx_number" WHERE "trx_type" = $1 AND "month" = $2 AND "year" = $3;`;
            const params = ['LOG', formatedMonth, year];
            pool.query(sql, params, (err, res) => {
              pool.end(); // end connection
    
              if (err) resolve(err);
              resolve(res);
            });
          });
          console.log(res);
          return res;
        }
        
      } catch (e) {
        console.log("Error: ", e);
      }
    }

    async function checkTruck({ data }) {
      try {
        const pool = await connects();
  
        const { id_truck, id_new_truck, change_type } = data; // deconstruct
        var truckId;
        const res = await new Promise((resolve) => {
          const sql = `SELECT id FROM "trx_sjp" WHERE "id_truck" = $1 AND "trx_status" != $2 AND "is_deleted" = $3;`;
          if(change_type === 'change_truck') {
            truckId = id_new_truck;
          } else {
            truckId = id_truck;
          }
          const params = [truckId, 4, 0];
          pool.query(sql, params, (err, res) => {
            pool.end(); // end connection
  
            if (err) resolve(err);
            resolve(res);
          });
        });
  
        return res;
      } catch (e) {
        console.log("Error: ", e);
      }
    }

    async function checkNameExist({ data }) {
      try {
        const pool = await connects();
  
        const { firstName, lastName } = data; // deconstruct
  
        const res = await new Promise((resolve) => {
          const sql = `SELECT id FROM "Employees" WHERE "firstName" = $1 AND "lastName" = $2;`;
          const params = [firstName, lastName];
          pool.query(sql, params, (err, res) => {
            pool.end(); // end connection
  
            if (err) resolve(err);
            resolve(res);
          });
        });
  
        return res;
      } catch (e) {
        console.log("Error: ", e);
      }
    }
  
    async function selectAll({}) {
      try {
        const pool = await connects();
  
        const res = await new Promise((resolve) => {
          const sql = `SELECT a.*, b.name as departure_company,
          c.name as destination_company,  d.name as transporter_company,
          e.license_plate, f.name as driver_name
          FROM "trx_sjp" as a
          JOIN "mst_companies" as b ON a."id_departure_company" = b.id
          JOIN "mst_companies" as c ON a."id_destination_company" = c.id
          JOIN "mst_companies" as d ON a."id_transporter_company" = d.id
          JOIN "mst_truck" as e ON a."id_truck" = e.id
          JOIN "mst_driver" as f ON a."id_driver" = f.id
          WHERE a.is_deleted = 0
          ORDER BY a.created_at DESC`;
          pool.query(sql, (err, res) => {
            pool.end(); // end connection
  
            if (err) resolve(err);
            resolve(res);
          });
        });
  
        return res;
      } catch (e) {
        console.log("Error: ", e);
      }
    }

    async function exportAll({from, to}) {
      try {
        const pool = await connects();
  
        
        const res = await new Promise((resolve) => {
          const sql = `SELECT a.*, b.name as departure_company,
          c.name as destination_company,  d.name as transporter_company,
          e.license_plate, f.name as driver_name
          FROM "trx_sjp" as a
          JOIN "mst_companies" as b ON a."id_departure_company" = b.id
          JOIN "mst_companies" as c ON a."id_destination_company" = c.id
          JOIN "mst_companies" as d ON a."id_transporter_company" = d.id
          JOIN "mst_truck" as e ON a."id_truck" = e.id
          JOIN "mst_driver" as f ON a."id_driver" = f.id
          WHERE a.is_deleted = 0 AND a.created_at >= $1 AND a.created_at < $2
          ORDER BY a.created_at DESC`;
          const params = [from, to];
          pool.query(sql, params, (err, res) => {
            pool.end(); // end connection
  
            if (err) resolve(err);
            resolve(res);
          });
        });
        return res;
      } catch (e) {
        console.log("Error: ", e);
      }
    }
  
    async function selectOne({ id }) {
      try {
        const pool = await connects();
  
        const res = await new Promise((resolve) => {
          const sql = `SELECT a.*, b.name as departure_company, b.email as email_departure,
          c.name as destination_company,  c.email as email_destination, d.name as transporter_company,
          e.license_plate, f.name as driver_name
          FROM "trx_sjp" as a
          JOIN "mst_companies" as b ON a."id_departure_company" = b.id
          JOIN "mst_companies" as c ON a."id_destination_company" = c.id
          JOIN "mst_companies" as d ON a."id_transporter_company" = d.id
          JOIN "mst_truck" as e ON a."id_truck" = e.id
          JOIN "mst_driver" as f ON a."id_driver" = f.id
          WHERE a.is_deleted = 0 AND a.id = $1
          ORDER BY a.created_at DESC`;
          const params = [id];
          pool.query(sql, params, (err, res) => {
            pool.end(); // end connection
  
            if (err) resolve(err);
            resolve(res);
          });
        });
  
        return res;
      } catch (e) {
        console.log("Error: ", e);
      }
    }
  
    async function checkNameExistUpdate({ data }) {
      try {
        const pool = await connects();
  
        const { firstName, lastName, id } = data; // deconstruct
        const res = await new Promise((resolve) => {
          const sql = `SELECT id FROM "Employees" WHERE "firstName" = $1 AND id <> $3 AND "lastName" = $2 AND id <> $3;`;
          const params = [firstName, lastName, id];
          pool.query(sql, params, (err, res) => {
            pool.end(); // end connection
  
            if (err) resolve(err);
            resolve(res);
          });
        });
  
        return res;
      } catch (e) {
        console.log("Error: ", e);
      }
    }
  
    async function changeDestination({ data }) {
      try {
        // use sequelize on update
        const Sjp = models.Sjps;
        const res = await Sjp.update(
          {
            id_destination_company: data.id_new_destination_company,
          },
          {
            where: {
              id: data.id,
            },
          }
        );
        return res;
      } catch (e) {
        console.log("Error: ", e);
      }
    }

    async function getCompanyDetail({ id }) {
      try {
        const pool = await connects();
  
        const res = await new Promise((resolve) => {
          const sql = `SELECT a.*, b.name as name_organization , c.name as name_company_type 
          FROM "mst_companies" as a
          JOIN "mst_organization" as b ON a."id_organization" = b.id
          JOIN "mst_company_type" as c ON a."id_company_type" = c.id
          WHERE a.is_deleted = 0 AND a.id = $1;`;
          const params = [id];
          pool.query(sql, params, (err, res) => {
            pool.end(); // end connection
  
            if (err) resolve(err);
            resolve(res);
          });
        });
  
        return res;
      } catch (e) {
        console.log("Error: ", e);
      }
    }

    async function getTruckDetail({ id }) {
      try {
        const pool = await connects();
        const res = await new Promise((resolve) => {
          const sql = `SELECT a.*, b.name as company_name
          FROM "mst_truck" as a
          JOIN "mst_companies" as b ON a."id_company" = b.id
          WHERE a.is_deleted = $2 AND a.id=$1;`;
          const params = [id, 0];
          pool.query(sql, params, (err, res) => {
            pool.end(); // end connection
            
            if (err) resolve(err);
            resolve(res);
          });
        });
  
        return res;
      } catch (e) {
        console.log("Error: ", e);
      }
    }

    async function changeTruck({ data }) {
      try {
        // use sequelize on update
        const Sjp = models.Sjps;
        const res = await Sjp.update(
          {
            second_driver: data.second_driver,
            id_truck: data.id_new_truck,
          },
          {
            where: {
              id: data.id,
            },
          }
        );
        return res;
      } catch (e) {
        console.log("Error: ", e);
      }
    }
  };

  async function recordAllTransaction({ data }) {
    try {
      var dataAllTransaction = {
        id_sjp: data.id_sjp,
        transaction: 'SJP',
        no_do: data.no_do,
        status: 'DRAFT',
        sender_reporter: data.reporter,
        company_departure: data.departure,
        company_destination: data.destination,
        company_transporter: data.transporter,
        truck_number: data.truck_number,
        driver_name: data.driver,
        good_pallet: data.good_pallet,
        reason: data.reason,
        note: data.note
      }
      // use sequelize on inserting
      const AllTransaction = models.AllTransactions;
      const res = await AllTransaction.create(dataAllTransaction);
      return res;
    } catch (e) {
      console.log("Error: ", e);
    }
  }
  
  module.exports = query;