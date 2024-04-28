[
    'DB_URL',
    'PORT',
    ].forEach((name) => {
        if (!process.env[name]) {
          throw new Error(`Environment variable ${name} is missing`)
        }
      })
    
      const config={
        DB_URL:process.env.DB_URL,
        PORT:process.env.PORT
      }
      // if (process.env.NODE_ENV === 'production') {
      //   config.DB_URL=process.env.DB_URL
      // } 
    module.exports=config
      