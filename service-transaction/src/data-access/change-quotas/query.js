const query = ({ connects, models }) => {
    return Object.freeze({
      insertNew,
      checkTrxNumberExist,
      getTrxNumber,
      selectAll,
      exportAll,
      selectOne,
      deleteItem,
      approval,
    });

    async function deleteItem({ id }) {
      try {
        // use sequelize on inserting
        const ChangeQuota = models.ChangeQuotas;
        const res = await ChangeQuota.update(
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

    async function approval({ data }) {
      try {
        // use sequelize on inserting
        const ChangeQuota = models.ChangeQuotas;
        const res = await ChangeQuota.update(
          {
            note: data.note,
            status: data.status,
            id_approver: data.id_approver,
            approved_quantity: data.approved_quantity,
            updated_by: data.updatedBy,
          },
          {
            where: {
              id: data.id,
            },
          }
        );

        const pool = await connects();

        const queryCompany = await new Promise((resolve) => {
          const sql = `SELECT a.*, b.name as name_organization , c.name as name_company_type 
          FROM "mst_companies" as a
          JOIN "mst_organization" as b ON a."id_organization" = b.id
          JOIN "mst_company_type" as c ON a."id_company_type" = c.id
          WHERE a.is_deleted = 0 AND a.id = $1;`;
          const params = [data.id_company_requester];
          pool.query(sql, params, (err, res) => {
            pool.end(); // end connection

            if (err) resolve(err);
            resolve(res);
          });
        });
        const palletQuota = queryCompany.rows[0].pallet_quota;
        if(data.status == 1) {
          if(data.type == 1) {
            
            const Company = models.Companies;
            const updateQuota = await Company.update(
              {
                pallet_quota: palletQuota - parseInt(data.approved_quantity),
              },
              {
                where: {
                  id: data.id_company_requester,
                },
              }
            );
          } else {
            const Company = models.Companies;
            const updateQuota = await Company.update(
              {
                pallet_quota: palletQuota + parseInt(data.approved_quantity),
              },
              {
                where: {
                  id: data.id_company_requester,
                },
              }
            );
          }
        }
        return res;
      } catch (e) {
        console.log("Error: ", e);
      }
    }

    async function insertNew({ data }) {
      try {
        // use sequelize on inserting
        const ChangeQuota = models.ChangeQuotas;
        const res = await ChangeQuota.create(data);

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
          const params = ['CQ', formatedMonth, year];
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
            trx_type: 'CQ',
            code: '4',
            month: formatedMonth,
            year: year,
            increment_number: 0
          });

          // query trx number
          const res = await new Promise((resolve) => {
            const sql = `SELECT * FROM "mst_trx_number" WHERE "trx_type" = $1 AND "month" = $2 AND "year" = $3;`;
            const params = ['CQ', formatedMonth, year];
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

    async function checkTrxNumberExist({ data }) {
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
          const sql = `SELECT a.*, b.name as company_name,
          c.username as requester_name, d.username as approver_name, e.id as id_new_pallet
          FROM "trx_change_quota" as a
          JOIN "mst_companies" as b ON a."id_company_requester" = b.id
          LEFT JOIN "users" as c ON a."id_requester" = c.id
          LEFT JOIN "users" as d ON a."id_approver" = d.id
          LEFT JOIN "trx_new_pallet" as e ON a."id" = e.id_trx_change_quota
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
          const sql = `SELECT a.*, b.name as company_name,
          c.username as requester_name, d.username as approver_name, e.id as id_new_pallet
          FROM "trx_change_quota" as a
          JOIN "mst_companies" as b ON a."id_company_requester" = b.id
          LEFT JOIN "users" as c ON a."id_requester" = c.id
          LEFT JOIN "users" as d ON a."id_approver" = d.id
          LEFT JOIN "trx_new_pallet" as e ON a."id" = e.id_trx_change_quota
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
          const sql = `SELECT a.*, b.name as company_name,
          c.username as requester_name, c.email as requester_email,d.username as approver_name
          FROM "trx_change_quota" as a
          JOIN "mst_companies" as b ON a."id_company_requester" = b.id
          LEFT JOIN "users" as c ON a."id_requester" = c.id
          LEFT JOIN "users" as d ON a."id_approver" = d.id
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
  
  };
  
  module.exports = query;