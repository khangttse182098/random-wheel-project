/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { toast } from "react-toastify";
import RollingSlot from "../../components/RollingSlot/RollingSlot";
import { RewardData } from "../../models/reward";
import {
  getRollingNumber,
  getWinnerList,
  saveWinner,
} from "../../service/event/api";
import useAppStore from "../../store/useAppStore";
import style from "./SpinPage.module.scss";
import "./select.scss";

const SpinPage = () => {
  const {
    participantList,
    setParticipantList,
    eventSetting,
    rewardList,
    setWinnerList,
    setRewardList,
  } = useAppStore((state) => state);

  const [remainingParticipants, setRemainingParticipants] = useState(
    structuredClone(participantList)
  );
  const [winner, setWinner] = useState<any>(null);
  const [winnerPerRoll, setWinnerPerRoll] = useState<number>(0);
  console.log(winnerPerRoll);
  const [selectedReward, setSelectedReward] = useState<number>(0);
  const [rollingTurns, setRollingTurnsLeft] = useState<number>(0);
  const [winnerId, setWinnerId] = useState<number | null>(null);
  const [totalRollingTurns, setTotalRollingTurns] = useState<number>(0);
  console.log(totalRollingTurns);
  const [currentRollingOrder, setCurrentRollingOrder] = useState<number>(0);

  const codeList = participantList!.map((item) => item.code);
  const [code, setCode] = useState<string[]>(
    Array(codeList[0].length).fill("")
  );
  const [previousCode, setPreviousCode] = useState<string[]>(
    Array(codeList[0].length).fill("0")
  );
  const [spinKey, setSpinKey] = useState(0);

  // Tạo mã ngẫu nhiên cho người trúng thưởng
  const handleGetRandomCode = (): {
    code: string[];
    participant: any;
  } | null => {
    if (remainingParticipants!.length === 0) return null;

    const randomPosition = Math.floor(
      Math.random() * remainingParticipants!.length
    );
    const selectedParticipant = remainingParticipants![randomPosition];

    const updatedRemaining = [...remainingParticipants!];
    updatedRemaining.splice(randomPosition, 1);
    setRemainingParticipants(updatedRemaining);

    return {
      code: selectedParticipant.code.split(""),
      participant: selectedParticipant,
    };
  };

  // Chuyển giải quay
  const handleChangeReward = useCallback(() => {
    const rewardedParticipants =
      participantList?.filter((p) => !p.isRewarded) ?? null;
    setRemainingParticipants(rewardedParticipants);
  }, [participantList]);

  // Hủy kết quả
  const handleCancelWinner = useCallback(() => {
    setRemainingParticipants(structuredClone(participantList));
    setWinner(null);
    setWinnerId(null);
    setCode(Array(codeList[0].length).fill(""));
  }, [participantList, codeList]);

  // Lưu kết quả người trúng thưởng
  const handleSaveWinner = useCallback(async () => {
    if (!winnerId) return toast.error("Chưa có người trúng thưởng!");

    try {
      const payload = {
        rewardId: selectedReward,
        winnersId: [winnerId],
        rollingOrder: currentRollingOrder,
      };
      await saveWinner(payload);

      const res = await getWinnerList(eventSetting!.eventId.toString());
      setWinnerList(res.data.data);

      const updatedParticipantList = participantList?.map((participant) => {
        const currentId = parseInt(participant.id!);
        if (currentId === winnerId) {
          return {
            ...participant,
            isRewarded: true,
            rewardId: participant.rewardId
              ? [...participant.rewardId, selectedReward]
              : [selectedReward],
          };
        }
        return participant;
      });
      setParticipantList(updatedParticipantList!);

      setRemainingParticipants((prev: any) =>
        prev.filter((p: any) => parseFloat(p.id) !== winnerId)
      );
      setRewardList(
        rewardList?.map((reward) => {
          if (reward.id === selectedReward) {
            return { ...reward, status: "Đã quay" };
          }
          return reward;
        }) as RewardData[]
      );
      toast.success("Đã lưu người trúng thưởng!");
      // handleCancelWinner();
      resetWinnerOnly();
    } catch (error) {
      console.log("Lỗi khi lưu kết quả:", error);
      toast.error("Lỗi khi lưu kết quả!");
    }
  }, [
    selectedReward,
    winnerId,
    rollingTurns,
    eventSetting?.eventId,
    setWinnerList,
    setParticipantList,
    setRewardList,
    rewardList,
    handleCancelWinner,
  ]);

  // Lấy số lượt quay
  const handleFetchSlotRoll = useCallback(async (rewardId: number) => {
    try {
      const res = await getRollingNumber(rewardId);
      const data = res.data.data;
      setWinnerPerRoll(data.winnerNumber);
      setRollingTurnsLeft(data.rollingNumber);
      setTotalRollingTurns(data.rollingNumber);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (selectedReward !== 0) {
      handleFetchSlotRoll(selectedReward);
    }
  }, [selectedReward, handleFetchSlotRoll]);

  const resetWinnerOnly = useCallback(() => {
    setWinner(null);
    setWinnerId(null);
  }, []);

  // Quay số
  const spin = () => {
    if (rollingTurns <= 0) return toast.error("Hết lượt quay!");

    const result = handleGetRandomCode();
    if (!result) return toast.error("Không còn người tham gia!");

    const { code: randomCode, participant: selectedWinner } = result;

    setWinner(selectedWinner);
    setWinnerId(selectedWinner ? parseInt(selectedWinner.id!, 10) : null);

    setPreviousCode([...code]);
    setCode(randomCode);
    setSpinKey((prevKey) => prevKey + 1);
    setRollingTurnsLeft((prev) => prev - 1);
    setCurrentRollingOrder((prev) => prev + 1);
  };

  return (
    <div className={style["container"]}>
      <div className={style["img-container"]}>
        {eventSetting?.showLogo ? (
          <img src={eventSetting?.logo} alt="logo" />
        ) : null}
      </div>
      <h2
        style={
          { "--titleText": eventSetting?.textColor } as React.CSSProperties
        }
        className={style["title"]}
      >
        {eventSetting?.showEventName ? eventSetting.eventName : <> </>}
      </h2>
      <div
        className={style["slot-machine"]}
        style={
          { "--borderColor": eventSetting?.textColor } as React.CSSProperties
        }
      >
        {code.map((num, index) => (
          <RollingSlot
            key={`${spinKey}-${index}`}
            currentCode={num}
            delay={index * 0.3}
            previousCode={previousCode[index]}
          />
        ))}
      </div>
      <div className={style["button-container"]}>
        <Select
          defaultValue="Chọn giải quay"
          suffixIcon={
            <TiArrowSortedDown size={20} color={eventSetting?.textColor} />
          }
          className={style["select-reward"]}
          style={
            {
              "--selectBg": eventSetting?.buttonColor,
              "--selectText": eventSetting?.textColor,
            } as React.CSSProperties
          }
          options={rewardList?.map((item) => ({
            value: item.rewardName,
            label: item.rewardName,
          }))}
          onChange={(value) => {
            const selectedRewardData = rewardList?.find(
              (item) => item.rewardName === value
            );
            if (selectedRewardData) {
              setSelectedReward(selectedRewardData.id);
              // setRollingTurnsLeft(selectedRewardData.rollingNumber);
              handleFetchSlotRoll(selectedRewardData.id);
              handleChangeReward();
            }
          }}
        />
        <div
          className={style["remaining-slot"]}
          style={
            {
              "--buttonBg": eventSetting?.buttonColor,
              "--buttonText": eventSetting?.textColor,
            } as React.CSSProperties
          }
        >
          <span>
            {selectedReward === 0
              ? "Chưa chọn giải quay"
              : `Lượt quay còn lại: ${rollingTurns}`}
          </span>
        </div>
        <button
          onClick={spin}
          style={
            {
              "--buttonBg": eventSetting?.buttonColor,
              "--buttonText": eventSetting?.textColor,
            } as React.CSSProperties
          }
          className={style["button"]}
        >
          Quay
        </button>
        {winner && (
          <Button type="primary" onClick={handleSaveWinner}>
            Lưu kết quả
          </Button>
        )}
      </div>
    </div>
  );
};

export default SpinPage;
