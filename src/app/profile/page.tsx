import { UserQuerry, AllUserExercisesQuerry } from "../../../database/querries/user";


const profile = async () => {
  const UserData = await UserQuerry();
  const UserExercises = await AllUserExercisesQuerry();

  const user = UserData ? UserData[0] : null;
  const exercises = UserExercises ? UserExercises : [];

  const getExerciseStats = () => {
    let avgWpm = 0;
    let avgAccuracy = 0;
    let avgTime = 0;
    let goldStars = 0;

    exercises.forEach(exercise => {
      avgWpm += exercise.wpm;
      avgAccuracy += exercise.accuracy;
      avgTime += exercise.time;
      goldStars += exercise.stars === 3 ? 1 : 0;
    });

    avgWpm = avgWpm / exercises.length;
    avgAccuracy = avgAccuracy / exercises.length;
    avgTime = avgTime / exercises.length;

    return {avgWpm, avgAccuracy, avgTime, goldStars};
    
  }

  const stats = getExerciseStats();

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
       <div className="py-10 my-20 ">
          <div className="flex justify-center items-center text-5xl">Hello <div className="text-[#47bac0] ml-2 font-bold text-center ">{user?.nickname}</div>!</div>
        </div>

        <div className="flex justify-center items-center text-2xl my-6">Exercises</div>
        <div className="flex justify-center gap-8 text-center items-center text-1xl">

          <div className="flex justify-center flex-col text-center items-center text-1xl">
            <div>
              {stats.avgWpm.toFixed(0)}
            </div>
            <div>Avg WPM</div>
          </div>

          <div>
            <div className="flex justify-center flex-col text-center items-center text-1xl">
              <div>
                {stats.avgAccuracy.toFixed(0)}%
              </div>
              <div>Avg Accuracy</div>
            </div>
          </div>

          <div>
            <div className="flex justify-center flex-col text-center items-center text-1xl">
              <div>
                {stats.avgTime.toFixed(2)}s
              </div>
              <div>Avg Time</div>
            </div>
          </div>

          <div>
            <div className="flex justify-center flex-col text-center items-center text-1xl">
              <div className="flex gap-1 items-baseline">
                <div>{stats.goldStars}</div>
                <div>
                  <svg className="text-yellow-300 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                </div>
              </div>
              <div>Stars</div>
            </div>
          </div>

      </div>

    <div className="text-2xl mt-16 mb-4">Information</div>
      <div>
        <div className="flex">Nickname: <div className="text-[#47bac0] ml-4">{user?.nickname}</div></div>
        <div className="flex">Email: <div className="text-[#47bac0] ml-4">{user?.email}</div></div>
        <div className="flex">Password: </div>
      </div>
    </div>
  );
}

export default profile;

/*
TODO

password change
email change
nickname change

*/