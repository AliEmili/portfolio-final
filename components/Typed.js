import Typed from 'react-typed';

function typed () {
  const roles = ['HTML', 'CSS','SCSS', 'BOOTSTRAP', 'MATERIAL UI', 'JAVASCRIPT', 'VUEJS2', 'VUEJS3', 'REACTJS', 'NUXTJS', 'NEXTJS', 'NODEJS', 'MONGODB', 'SQL', 'MONGOOSE', 'STRAPIJS']
  return(
    <div>
      <Typed
       loop
        typeSpeed={60}
        backSpeed={60}
        strings={roles}
        backDelay={1000}
        loopCount={0}
        showCursor
        className="self-typed"
        cursorChar="|"
      />
    </div>
  )
}

export default typed
