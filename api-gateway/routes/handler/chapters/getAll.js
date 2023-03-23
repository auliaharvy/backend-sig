const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_COURSE,
    HOSTNAME
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
    try {
        const chapters = await api.get('/api/chapter', {
            params: {
                ...req.query
            }
        });
        // const chapterData = chapter.data;
        // const firstPage = chapterData.data.first_page_url.split('?').pop();
        // const lastPage = chapterData.data.last_page_url.split('?').pop();
        // chapterData.data.first_page_url = `${HOSTNAME}/chapter?${firstPage}`;
        // chapterData.data.last_page_url = `${HOSTNAME}/chapter?${lastPage}`;

        // if(chapterData.data.next_page_url) {
        //     const nextPage = chapterData.data.next_page_url.split('?').pop();
        //     chapterData.data.next_page_url = `${HOSTNAME}/chapter?${nextPage}`;
        // }
        // if(chapterData.data.prev_page_url) {
        //     const prevPage = chapterData.data.prev_page_url.split('?').pop();
        //     chapterData.data.prev_page_url = `${HOSTNAME}/chapter?${prevPage}`;
        // }
        // chapterData.data.path = `${HOSTNAME}/chapter`;

        return res.json(chapters.data);
    } catch (error) {

        if(error.code === "ECONNREFUSED") {
            return res.status(500).json({
                status: 'error',
                message: 'Service Unavailable'
            })
        }

        //const { data } = error.response;
        return res.status(500).json(error.response);
    }
}