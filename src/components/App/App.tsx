import { useEffect, useState } from "react";
import { Flex, Typography, TimePicker, Button } from "antd";
import dayjs, { Dayjs } from "dayjs";

const { Title, Text } = Typography;

import styles from './App.module.css'
import { formatDate, formatTime } from "../../utils";

const App = () => {
  const [startTime, setStartTime] = useState<Dayjs>(dayjs());
  const [targetTime, setTargetTime] = useState<Dayjs>(() => {
    return dayjs().startOf("day").add(8, "hours");
  });
  const [finishTime, setFinishTime] = useState<Dayjs>(dayjs().add(8, "hours"));

  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  const handleSetRemainingTime = (time: Dayjs) => {
    if (time) {
      setTargetTime(time);
      setFinishTime(startTime.add(time.diff(dayjs().startOf("day"))));
    }
  };

  const handleStartTimer = () => {
    setStartTime(dayjs());
    setTimerRunning(true);
  };

  const handleStopTimer = () => {
    setTimerRunning(false);
  };

  useEffect(() => {
    let intervalId = null;

    if (timerRunning) {
      intervalId = setInterval(() => {
        setTargetTime(prevTime => prevTime.subtract(1, "second"));
      }, 1000);
    } else if (!timerRunning) {
      intervalId = setInterval(() => {
        setFinishTime(prevTime => prevTime.add(1, "second"));
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [timerRunning]);

  return (
    <Flex className={styles.app} vertical align="center">
      <Title className={styles.title} level={1}>Work Timer ⏳</Title>
      {targetTime !== null && <Text className={styles.text}>Осталось: {formatTime(targetTime)}</Text>}
      <Text className={styles.text}>Закончите {formatDate(finishTime)}</Text>
      <TimePicker
        className={styles.timer}
        value={targetTime}
        disabled={timerRunning}
        onChange={handleSetRemainingTime}
        placeholder="Выберите время"
      />
      <Flex className={styles.buttonContainer} gap={10}>
        <Button block type="primary" onClick={handleStartTimer} disabled={timerRunning}>Start</Button>
        <Button block type="primary" danger onClick={handleStopTimer} disabled={!timerRunning}>Stop</Button>
      </Flex>
    </Flex >
  );
};

export default App;
