const selectChangeQuota = ({ changeQuotaDb }) => {
    return async function select(info) {
      let data = [];
  
      const { id } = info; // deconstruct
  
      if (id) {
        // select one
        const res = await changeQuotaDb.selectOne({ id });

        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];
  
            // push items to array
            data.push({
              id: e.id,
              id_company_requester: e.id_company_requester ? e.id_company_requester : null,
              id_new_pallet: e.id_new_pallet ? e.id_new_pallet : 'belum ada',
              id_requester: e.id_requester ? e.id_requester : null,
              id_approver: e.id_approver ? e.id_approver : null,
              trx_number: e.trx_number ? e.trx_number : null,
              quantity: e.quantity ? e.quantity : null,
              type: e.type ? e.type : 0,
              approved_quantity: e.approved_quantity ? e.approved_quantity : null,
              status: e.status ? e.status : 0,
              note: e.note ? e.note : null,
              reason: e.reason ? e.reason : null,
              company_name: e.company_name ? e.company_name : null,
              requester_name: e.requester_name ? e.requester_name : null,
              approver_name: e.approver_name ? e.approver_name : null,
              created_at: e.created_at,
              updated_at: e.updated_at,
            });
          }
        }
      } else {
        // select all
        const res = await changeQuotaDb.selectAll({});

        if (res.rowCount > 0) {
          // only when there is data returned
          const items = res.rows;
          for (let i = 0; i < items.length; i++) {
            const e = items[i];
  
            // push items to array
            data.push({
              id: e.id,
              id_company_requester: e.id_company_requester ? e.id_company_requester : null,
              id_new_pallet: e.id_new_pallet ? e.id_new_pallet : 'belum ada',
              id_requester: e.id_requester ? e.id_requester : null,
              id_approver: e.id_approver ? e.id_approver : null,
              trx_number: e.trx_number ? e.trx_number : null,
              quantity: e.quantity ? e.quantity : null,
              type: e.type ? e.type : null,
              approved_quantity: e.approved_quantity ? e.approved_quantity : null,
              status: e.status ? e.status : null,
              note: e.note ? e.note : null,
              reason: e.reason ? e.reason : null,
              company_name: e.company_name ? e.company_name : null,
              requester_name: e.requester_name ? e.requester_name : null,
              approver_name: e.approver_name ? e.approver_name : null,
              created_at: e.created_at,
              updated_at: e.updated_at,
            });
          }
        }
      }
      return data;
    };
  };
  
  module.exports = selectChangeQuota;