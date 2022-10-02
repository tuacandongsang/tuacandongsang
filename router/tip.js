this.$watch(
    () => this.$route.params.id,
    async (value, _) => {
      const response = await requestAuthorized.get(`/api/product/${value}`);
      this.productDetail = response;  // tìm ra productdetail
      this.quantity = 1; // chuyển về 1
    }
  );
  // theo dõi sự thay đổi của router poductdetail

  // lưu data lên $route.query.q sau đó khi có f5 lại thì sẽ k bị mất ở input
  this.$watch(
    () => this.$route.query.q,
    async (value, _) => {
      this.search = value;
      if (value.trim().length > 0) {
        this.searchResult = await requestAuthorized.get(
          `/api/search?page=1&size=8&name=${this.$route.query.q}`
        );
      } else {
        this.searchResult = [];
      }
    }
  );
  data() {
    return {
      search: this.$route.query.q,
      searchResult: [],
    };
  }

  // theo dõi sự thay đổi .$route.params.id, để render data productdetail 
  this.$watch(
    () => this.$route.params.id,
    async (value, _) => {
      const response = await requestUnauthorized.get(
        `/api/admin/product/${value}`  // api productdetail
      );
      this.productDetail = response;
    }
  );
