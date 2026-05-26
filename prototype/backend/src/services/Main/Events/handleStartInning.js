




/** def handle_inning_start(self):
        last_phase = self.update["newInningPhase"]
        next_phase = self.next_update["newInningPhase"]
        if self.ty == EventType.HALF_INNING and self.next_update["topOfInning"]:
            next_phase = 10 # making up a high number, the game sets this back to -1 before starting tick otherwise


        for cur_phase in range(last_phase+1, next_phase+1):
            if cur_phase == 0 and self.weather == Weather.SALMON:
                self.handle_salmon()

            if cur_phase == 2:
                has_hotel_motel = self.stadium.has_mod(Mod.HOTEL_MOTEL) or self.season >= 18
                if has_hotel_motel and self.day < 27:
                    hotel_roll = self.roll("hotel motel")

                    if self.ty == EventType.HOLIDAY_INNING:
                        self.log_roll(Csv.MODPROC, "Hotel", hotel_roll, True)
                    else:
                        self.log_roll(Csv.MODPROC, "Notel", hotel_roll, False)
                    return True
                
            if cur_phase == 3:
                # sun 30 message doesn't do anything
                pass */