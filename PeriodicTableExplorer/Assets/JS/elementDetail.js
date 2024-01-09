$(() => {
  var myParam = location.search.split("elemSymbol=")[1];

  axios
    .get("../Data/PeriodicTable.json")
    .then((response) => {
      response.data.find((data) => {
        if (data.symbol === myParam) {
          console.log(data);
          $(".elem_name").html(data.name);
          $(".elem_symbol").html(data.symbol);
          $(".elem_desc").html(data.summary);
          $(".elem_mass").html(data.atomic_mass);
          $(".elem_boilpoint").html(data.boil);
          $(".elem_meltpoint").html(data.melt);
          $(".elem_cat").html(data.category);
          $(".elem_density").html(data.density);
          $(".elem_appearance").html(data.appearance);
          $(".elem_discoverby").html(data.discovered_by);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
