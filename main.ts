import { world, system, ScoreboardObjective, DisplaySlotId, Player, EntityHealthComponent } from "@minecraft/server";
import { Utilities } from "utilities";

//Setup
const healthObjective: ScoreboardObjective =  world.scoreboard.getObjective("healthObjective") 
    ?? world.scoreboard.addObjective("healthObjective", "§c❤");
world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.BelowName, {objective: healthObjective});

//Loop
system.runInterval((): void => {
    world.getAllPlayers().forEach((player: Player) => {
        if (player.hasTag("dmc:remove_display_health") === false) {
            const healthComp = player.getComponent("minecraft:health") as EntityHealthComponent;
            healthObjective.setScore(player, healthComp.currentValue);
        } else { 
            healthObjective.removeParticipant(player);
        };
    })
});

system.runInterval(() => {
    world.getAllPlayers().forEach((player: Player) => {
        const entity = Utilities.getClosestEntityFromViewDirection(player, 5);
        if (entity === undefined || entity.typeId === "minecraft:player") {
            return player.onScreenDisplay.setActionBar("");
        };
        if (entity.hasComponent("minecraft:health") === false) return;
        const healthComp = entity.getComponent("minecraft:health") as EntityHealthComponent;
        if (healthComp.currentValue > (Math.floor(healthComp.effectiveMax/1.33)) ) {
            player.onScreenDisplay.setActionBar(`${healthComp.currentValue} §a❤`);
        } else if (healthComp.currentValue > (Math.floor(healthComp.effectiveMax/2)) ) {
            player.onScreenDisplay.setActionBar(`${healthComp.currentValue} §e❤`);
        } else if (healthComp.currentValue > (Math.floor(healthComp.effectiveMax/4)) ) {
            player.onScreenDisplay.setActionBar(`${healthComp.currentValue} §6❤`);
        } else {
            player.onScreenDisplay.setActionBar(`${healthComp.currentValue} §c❤`);
        };
    });
});