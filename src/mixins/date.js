import moment from 'moment';

export default {
  methods: {
    dateFormat(date) {
      return moment(date).format('YYYY-MM-DD HH:mm');
    },
  },
};
