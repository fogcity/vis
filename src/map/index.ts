import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = 'pk.eyJ1IjoidHJldm9yeHUiLCJhIjoiY2t4Z3dobm1kMHhwMjJvbnB4Ymd1ZXdoYSJ9.aaE5HnD_91WD8SDhriVjAw'

const map = (id: string) => {
  new mapboxgl.Map({
    container: id,
    style: 'mapbox://styles/trevorxu/ckxgwmcv3i62q14pau06p8jjv',
  })
}

export default map
