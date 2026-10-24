import {MatchmakingHandler} from "./matchmaking.handler";
import BattleInitUseCase from "../../../application/use-cases/battle/battle-init";
import BattleEntity from "../../../domain/battle/battle.entity";
import BattleId from "../../../domain/battle/value-objects/battle-id.vo";
import BattlePlayerIds from "../../../domain/battle/value-objects/battle-player-ids.vo";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";
import BattleStatus from "../../../domain/battle/value-objects/battle-status.vo";
import BattleStatusEnum from "../../../domain/battle/enums/battle-status.enum";

function makeBattle(id: string): BattleEntity {
    return BattleEntity.create({
        id: new BattleId(id),
        playerIds: new BattlePlayerIds([new ProfileId('profile-1')]),
        status: new BattleStatus(BattleStatusEnum.Matched),
    });
}

describe('MatchmakingHandler', () => {
    let handler: MatchmakingHandler;
    let useCase: jest.Mocked<BattleInitUseCase>;

    beforeEach(() => {
        useCase = {
            execute: jest.fn(),
        } as unknown as jest.Mocked<BattleInitUseCase>;

        handler = new MatchmakingHandler(useCase);
    });

    function runInit(request: any) {
        const callback = jest.fn();
        return handler
            .init({request} as any, callback)
            .then(() => callback.mock.calls[0]);
    }

    it('возвращает баттл без track_id', async () => {
        useCase.execute.mockResolvedValue(makeBattle('battle-1'));

        const [err, result] = await runInit({profileId: 'profile-1', battleId: 'battle-1'});

        expect(err).toBeNull();
        expect(result.battle.id).toBe('battle-1');
        expect(useCase.execute).toHaveBeenCalledWith(
            expect.anything(),
            expect.anything(),
        );
    });
});
