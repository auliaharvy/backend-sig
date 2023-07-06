const query = ({ connects, models }) => {
    return Object.freeze({
      selectAll,
    });
  
    async function selectAll({}) {
      try {
        // Tambahkan kode di bawah ini untuk menjalankan permintaan Sequelize
        const res = await models.SjpStatuss.findAll({
          where: { is_deleted: 0 },
          include: [
            { model: models.Users, as: 'user_sender' },
            { model: models.Users, as: 'user_receiver' },
            { model: models.Pallets, as: 'pallets' },
            {
              model: models.Sjps, as: 'sjp',
              include: [
                { model: models.Companies, as: 'departure_company' },
                { model: models.Companies, as: 'destination_company' },
                { model: models.Companies, as: 'transporter_company' },
                { model: models.Trucks, as: 'truck' },
                { model: models.Drivers, as: 'driver' },
              ]
            }
          ],
          order: [['created_at', 'DESC']]
        });

        // const res = await models.Sjps.findAll({
        //   where: { is_deleted: 0 },
        //   include: [
        //     { model: models.Companies, as: 'departure_company' },
        //     { model: models.Companies, as: 'destination_company' },
        //     { model: models.Companies, as: 'transporter_company' },
        //     { model: models.Trucks, as: 'truck' },
        //     { model: models.Drivers, as: 'driver' },
        //     {
        //       model: models.SjpStatuss, as: 'status',
        //       include: [
        //         { model: models.Users, as: 'user_sender' },
        //         { model: models.Users, as: 'user_receiver' }
        //       ]
        //     }
        //   ],
        //   order: [['created_at', 'DESC']]
        // });

        // //(res);
  
        return res;
      } catch (e) {
        //("Error: ", e);
      }
    }
  };
  
  module.exports = query;