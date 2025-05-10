const SORT_OPTIONS = {
   LATEST: "latest",
   POPULAR: "popular",
   OLDEST: "oldest",
};

const sortVideosMethods = {
   [SORT_OPTIONS.LATEST]: (videos) => {
      let _videos = [...videos]

      _videos.sort((a, b) => {
         const date_a = new Date(a.created_at)
         const date_b = new Date(b.created_at)

         return date_b - date_a
      })

      return _videos
   },
   [SORT_OPTIONS.POPULAR]: (videos) => {
      let _videos = [...videos]

      _videos.sort((a, b) => {
         const views_a = a.views_count
         const views_b = b.views_count

         return views_a - views_b
      })

      return _videos
   },
   [SORT_OPTIONS.OLDEST]: (videos) => {
      let _videos = [...videos]

      _videos.sort((a, b) => {
         const date_a = new Date(a.created_at)
         const date_b = new Date(b.created_at)

         return date_a - date_b
      })

      return _videos
   },
}

export default sortVideosMethods