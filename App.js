import React, { useState } from "react";

import FileScreen from "./screens/FileScreen";
import LoadingScreen from "./screens/LoadingScreen";

const App = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [isLoadingScreenAnimating, setIsLoadingScreenAnimating] = useState(
    true
  );

  return (
    <>
      <FileScreen
        isVisible={!showLoadingScreen}
        onDoneLoading={() => setShowLoadingScreen(false)}
      />
      <LoadingScreen
        isVisible={showLoadingScreen}
        isAnimating={isLoadingScreenAnimating}
        onAnimateOut={() => setIsLoadingScreenAnimating(false)}
      />
    </>
  );
};

export default App;
