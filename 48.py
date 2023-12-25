from sympy import symbols, solve 


input = """"""


def doIt(raw_input):
    lines = raw_input.split('\n')

    symbollist = []
    ans_xint = symbols('ans_xint')
    ans_yint = symbols('ans_yint')
    ans_zint = symbols('ans_zint')

    ans_xslope = symbols('ans_xslope')
    ans_yslope = symbols('ans_yslope')
    ans_zslope = symbols('ans_zslope')



    symbollist.extend([ans_xint, ans_yint, ans_zint, ans_xslope, ans_yslope, ans_zslope])

    equationlist = []

    i = 0
    for line in lines[:3]:
        [coord, v] = [[int(x) for x in coords.split(',')] for coords in line.split('@')]

        t = symbols('t_{idx}'.format(idx=i))
        symbollist.append(t)

        equationlist.extend([
                ans_xint + ans_xslope * t-
                (coord[0] + v[0]*t),
           
                ans_yint + ans_yslope * t-
                (coord[1] + v[1]*t),

                ans_zint + ans_zslope * t -
                (coord[2] + v[2]*t)
        ])

        i += 1

    print(sum(solve(equationlist, symbollist)[0][:3]))


doIt(input)