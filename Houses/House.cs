﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using GrandTheftMultiplayer.Server;
using GrandTheftMultiplayer.Server.API;
using GrandTheftMultiplayer.Server.Elements;
using GrandTheftMultiplayer.Server.Constant;
using GrandTheftMultiplayer.Server.Managers;
using GrandTheftMultiplayer.Shared;
using GrandTheftMultiplayer.Shared.Math;

namespace GTA_RP.Houses
{
    /// <summary>
    /// Class for a building that can have players in it
    /// </summary>
    class House
    {
        public String name { get; private set; }
        public int id { get; private set; }
        public int ownerId { get; private set; }
        public int templateId { get; private set; }
        private List<Character> occupants = new List<Character>();
        private List<Character> invitedPersons = new List<Character>();

        public House(int id, int ownerId, int templateId, String name)
        {
            this.name = name;
            this.id = id;
            this.ownerId = ownerId;
            this.templateId = templateId;
        }

        /// <summary>
        /// Adds an occupant to the building
        /// </summary>
        /// <param name="c">Character to be added inside</param>
        public void AddOccupant(Character c)
        {
            occupants.Add(c);
        }

        /// <summary>
        /// Removes an occupant from the building
        /// </summary>
        /// <param name="c">Character to be removed</param>
        public void RemoveOccupant(Character c)
        {
            occupants.Remove(c);
        }

        /// <summary>
        /// Adds a character to the invited persons list of the building
        /// Now the invited character can access the building
        /// </summary>
        /// <param name="c">Character to be added to the list</param>
        public void AddInvitation(Character c)
        {
            invitedPersons.Add(c);
        }

        /// <summary>
        /// Removes a character from the invited persons list
        /// Now the uninvited character can no longer access the building
        /// </summary>
        /// <param name="c">Character to be uninvited from the building</param>
        public void RemoveInvitation(Character c)
        {
            invitedPersons.Remove(c);
        }

        /// <summary>
        /// Checks if a character is invited to the building
        /// </summary>
        /// <param name="c">Character that is checked</param>
        /// <returns>True if character is on the invited list, otherwise false</returns>
        public Boolean IsInvited(Character c)
        {
            return invitedPersons.Contains(c);
        }

        /// <summary>
        /// Checks if character is inside the building
        /// </summary>
        /// <param name="c"></param>
        /// <returns>True if character is inside the building, otherwise false</returns>
        public Boolean HasOccupant(Character c)
        {
            return occupants.Contains(c);
        }
    }
}
